class WelcomeController < ApplicationController
  def index
    @post = Post.order("id DESC").page(params[:page]).per(5)
  end
end
