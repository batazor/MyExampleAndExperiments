class AdminController < ApplicationController
  def main
    @category = Category.count();
    @posts = Post.count();
    @tags  = Tags.count();
    @users = User.count();
  end
end
