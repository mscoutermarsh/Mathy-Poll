class Vote < ActiveRecord::Base
  
  validates :vote, :presence => true
  validates :ip, :presence => true

  after_create :create_captcha

  def create_captcha
    int1 = 1 + rand(15)
    int2 = 1 + rand(4)
    self.answer = int1 + int2
    self.valid_vote = false
    self.question = "What's #{int1}+#{int2}?"
    self.save
  end

  def make_valid
      self.valid_vote = true
      self.save
      true
  end

  def confirm(answer)
    (answer == self.answer) ? self.make_valid  : false
  end
end