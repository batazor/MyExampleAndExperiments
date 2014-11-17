class WelcomeController < ApplicationController
  def index
    if params[:tag]
      @post = Post.tagged_with(params[:tag]).order("id DESC").page(params[:page]).per(5)
    else
      @post = Post.order("id DESC").page(params[:page]).per(5)
    end
  end
end
