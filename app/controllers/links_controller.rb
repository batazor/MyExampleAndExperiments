class LinksController < ApplicationController

  def new
    render plain: 'params[@link].inspect'
  end

  def create
    require 'digest/sha1'

    if $redis.keys(params[:link][:url]).length == 0 then
      @hash = Digest::SHA1.hexdigest params[:link][:url]
      $redis.set(@hash[0..12], params[:link][:url]);

      @reply = "Your link: " + @hash[0..12]
    elsif
      @reply = "address not available"
    end

    render plain: @reply
  end

  def redirect
    if $redis.keys(params[:id]).length != 0 then
      redirect_to "http://"+$redis.get(params[:id])
    elsif
      redirect_to root_path
    end
  end
end
