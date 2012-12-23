require "spec_helper"


describe Application do
  include Goliath::TestHelper

  let(:err) { Proc.new { |c| fail "HTTP Request failed #{c.response}" } }


  describe "GET /votes/" do
    it "should return 0 votes" do
      #get_request({:path => "/votes/1"}, err) do |c|
      #  c.response_header.status.should == 200
      #  JSON.parse(c.response)['votes'].should == 0
      #end
    end

    it "should return 1 vote" do
      #Vote.create(:vote => 1, :valid_vote => true)
      #post "/votes/1"
      #response.status.should == 200
      #JSON.parse(response.body)['votes'].should == 1
    end
  end
end