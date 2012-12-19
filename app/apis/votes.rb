class Votes < Grape::API
  format :json

  helpers do
    # was this request through ajax?
    def ajax
      request.xhr?  
    end

    def ip_address
      request.ip
    end

    # more than 3 votes in the past hour from this IP?
    def ip_votes_hour
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ? AND valid_vote = ?", 1.hour.ago, ip_address, true]).count <= 3
    end

    # more than 20 votes in the past day from this IP?
    def ip_votes_day
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ? AND valid_vote = ?", 1.day.ago, ip_address, true]).count <= 20
    end

    # validate the voter.
    def validate
      ip_address and ip_votes_hour and ip_votes_day

      # Restrict to only ajax calls by adding: and ajax
      # ip_address and ip_votes_hour and ip_votes_day and ajax
    end
  end

  # return number of votes
  resource 'votes' do
    get "/:contestant" do 
      votes = Vote.where(:vote => params['contestant'], :valid_vote => true).count
      {:votes=>votes}
    end
  end
  
  # create and confirm votes
  resource 'vote' do
    desc "Create new vote"
    params do
      requires :contestant, :type => Integer, :desc => "Integer for which contestant you're voting for."
    end
    post "/:contestant" do
      # Validate voter and then ask the user some math.
      if validate then
        new_vote = Vote.create(:vote => params['contestant'], :ip=>request.ip)
        {:id=>new_vote.id,:question=>new_vote.question}
      else
        error!({:message=>"You've already voted!"}, 401)
      end
    end

    desc "Confirm"
    params do
      requires :answer, :type => Integer, :desc => "Answer the math problem."
    end
    post "/confirm/:id/:answer" do
      # check the users answer
      new_vote = Vote.find(params[:id])
      if new_vote.valid_vote then
        {:message=>"Already voted."}
      elsif new_vote.confirm(params['answer'])
        {:message=>"Thanks for voting!"}
      else
        error!({:message=>"Whoops, wrong answer."}, 400)
      end
    end

  end
  
end