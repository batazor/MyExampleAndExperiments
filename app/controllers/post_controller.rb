class PostController < ApplicationController
  def index
    @post = Post.find_id_or_title(params[:id]) || Post.find_date_ttle(params[:date], params[:title])
    # render plain: @post.created_at.strftime("%F")
  end
end
