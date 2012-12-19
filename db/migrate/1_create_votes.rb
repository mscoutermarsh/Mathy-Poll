class CreateVotes < ActiveRecord::Migration
  
  def change
    create_table :votes do |t|
      t.integer  :vote
      t.string   :ip
      t.string   :question
      t.boolean  :valid_vote
      t.integer  :answer
      t.timestamps
    end

    add_index(:votes, :vote)
    add_index(:votes, :valid_vote)
    add_index(:votes, :ip)
  end
  
end