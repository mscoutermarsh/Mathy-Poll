require "rubygems"
require "bundler/setup"
require 'goliath'
require 'em-synchrony/activerecord'
require 'grape'
require './app/apis/votes'
require './app/models/vote'

require 'goliath/rack/templates'
require 'goliath/plugins/latency'

class Application < Goliath::API

  include Goliath::Rack::Templates      # render templated files from ./views

  use(Rack::Static,                     # render static files from ./public
      :root => Goliath::Application.app_path("public"),
      :urls => ["/favicon.ico", '/stylesheets', '/javascripts', '/images'])

  plugin Goliath::Plugin::Latency       # ask eventmachine reactor to track its latency

  def recent_latency
    Goliath::Plugin::Latency.recent_latency
  end

  def response(env)
    case env['PATH_INFO']
        when '/' then [200, {}, haml(:index)]
        else ::Votes.call(env)
    end
  end

end