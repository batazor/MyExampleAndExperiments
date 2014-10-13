class WelcomeController < ApplicationController
  def index
    $redis = Redis.new
  end
end
