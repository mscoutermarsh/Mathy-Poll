class Vote < ActiveRecord::Base
  
  validates :vote, :presence => true
  validates :ip, :presence => true
  validates :answer, :presence => true
  
end