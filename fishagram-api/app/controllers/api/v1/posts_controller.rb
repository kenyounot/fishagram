class Api::V1::PostsController < ApplicationController
  include CurrentUserConcern

  def index
    @posts = Post.all
    render json: @posts
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      
      render json: {
        data: @post,
        status: :created,
        message: "created mother fucka"
      }
    else
      render json: {
        message: "didnt create mo fo!",
        errors: @post.errors
      }
    end


  end

  def update
  end


  private

  def post_params
    params.require(:data).permit(:caption, :weight, :length, :lure_used, :image, :user_id)
  end
end
