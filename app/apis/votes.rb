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

    def ip_votes_hour
      # more than 3 votes in the past hour?
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ?", 1.hour.ago, ip_address]).count >= 3
    end

    def ip_votes_day
      # more than 20 votes in the past day?
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ?", 1.day.ago, ip_address]).count >= 20
    end

    def validate
      # validate the voter.
      # is this and ajax request? and is there an ip address?
      # have they votes >= 5 times this hour?

      ajax and ip_address and ip_votes_hour and ip_votes_day

    end
  end
  
  resource 'votes' do
    get "/" do
      ip_votes_day
    end
    
    get "/:id" do 
      Vote.count(:vote => params['id'], :valid => true)
    end
    
    desc "Create new vote"
    params do
      requires :vote, :type => String, :desc => "Integer for which contestant you're voting for."
    end
    post "/create" do
      # ask the user simple math

      if validate then
        int1 = 1 + rand(15)
        int2 = 1 + rand(4)
        answer = int1 + int2
        new_vote = Vote.create(:vote => params['vote'], :ip=>request.ip, :valid_vote => false, :answer => answer)
        {:id=>new_vote.id,:question=>"What's #{int1}+#{int2}?"}
      else
        error!({:message=>"You've already voted!"}, 401)
      end
    end

    desc "Confirm"
    params do
      requires :answer, :type => Integer, :desc => "Answer the math problem."
    end
    post "/confirm/:id" do
      # check the users answer
      new_vote = Vote.find(params[:id])
      if new_vote.valid_vote then
        {:message=>"Already voted."}
      elsif new_vote.answer == params['answer']
        new_vote.valid_vote = true
        new_vote.save
        {:message=>"Thanks for voting!"}
      else
        error!({:message=>"Whoops, wrong answer."}, 400)
      end
    end

  end
  
end