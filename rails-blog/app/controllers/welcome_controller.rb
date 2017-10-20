class WelcomeController < ApplicationController
  def index
    @setting = Setting.find(1)

    if params[:tag]
      @post = Post.tagged_with(params[:tag]).order("id DESC").page(params[:page]).per(5)
    else
      @post = Post.order("id DESC").page(params[:page]).per(5)
    end
  end

  def rss
    @posts = Post.order(created_at: :desc).limit(10)
    render :layout => false
  end

  def sitemap
    respond_to do |format|
      format.xml { render file: 'public/sitemaps/sitemap.xml' }
      format.html { redirect_to root_url }
    end
  end
end
