class Admin::TagsController < ApplicationController
  layout "admin"

  def index
    @tags = Tags.order("taggings_count").page(params[:page]).per(10)
  end

  def edit
    @tags = Tags.find(params[:id])
  end

  def update
    @tags = Tags.find(params[:id])

    if @tags.update(tag_params)
      redirect_to admin_tags_url
    else
      render 'edit'
    end
  end

  def destroy
    @tags = Tags.find(params[:id])
    @tags.destroy

    redirect_to admin_tags_path
  end

  private
    def tag_params
      params.require(:tags).permit(:name)
    end
end
