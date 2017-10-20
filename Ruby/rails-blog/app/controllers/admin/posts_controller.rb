class Admin::PostsController < ApplicationController
  layout "admin"

  def index
    @post = Post.order("title").page(params[:page]).per(10)
  end

  def new
    @post = Post.new()
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to admin_post_path(@post)
    else
      render 'new'
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to admin_post_path(params[:id])
    else
      render 'edit'
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    redirect_to admin_posts_path
  end

  private
    def post_params
      params.require(:post).permit(:title, :text, :category_id, :tag_list)
    end
end
