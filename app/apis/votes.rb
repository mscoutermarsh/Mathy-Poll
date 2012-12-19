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
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ? AND valid_vote = ?", 1.hour.ago, ip_address, true]).count <= 3
    end

    def ip_votes_day
      # more than 20 votes in the past day?
      Vote.find(:all, :conditions => ["created_at > ? AND ip = ? AND valid_vote = ?", 1.day.ago, ip_address, true]).count <= 20
    end

    def validate
      # validate the voter.
      # is this and ajax request? and is there an ip address?
      # have they votes >= 5 times this hour?
      # ajax and
      ip_address and ip_votes_hour and ip_votes_day

    end
  end
  
  resource 'votes' do
    # get "/ip_votes_hour" do
    #   Vote.find(:all, :conditions => ["created_at > ? AND ip = ?", 1.hour.ago, ip_address]).count
    # end
    # get "/ip_votes_day" do
    #   Vote.find(:all, :conditions => ["created_at > ? AND ip = ?", 1.day.ago, ip_address]).count
    # end
    get "/" do
      ip_votes_day
    end
    
    get "/:id" do 
      Vote.where(:vote => params['id'], :valid_vote => true).count
    end
    
    desc "Create new vote"
    params do
      requires :id, :type => String, :desc => "Integer for which contestant you're voting for."
    end
    post "/:id" do
      # ask the user simple math
      if validate then
        new_vote = Vote.create(:vote => params['id'], :ip=>request.ip)
        {:id=>new_vote.id,:question=>new_vote.question}
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
      elsif new_vote.confirm(params['answer'])
        {:message=>"Thanks for voting!"}
      else
        error!({:message=>"Whoops, wrong answer."}, 400)
      end
    end

  end
  
end