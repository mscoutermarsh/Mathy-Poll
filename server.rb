require "rubygems"
require "bundler/setup"
require 'goliath'
require 'em-synchrony/activerecord'
require 'grape'
require './app/apis/votes'
require './app/models/vote'

class Application < Goliath::API

  def response(env)
    ::Votes.call(env)
  end

end