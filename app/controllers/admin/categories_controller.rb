class Admin::CategoriesController < ApplicationController
  layout "admin"

  def index
  end

  def new
  end

  def create
    render plain: params[:article].inspect
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def show
  end
end
