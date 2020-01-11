class Api::V1::PostsController < ApplicationController

  def index
    @posts = Post.all
    render json: {
      data: {
        posts: @posts
      }
    }
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
    if @post = Post.find_by(id: params[:id])
      @post.update(post_params)

      render json: {
        data: {
          post: @post,
          updated: true
        }
      }
    else
      render json: {
        data: {
          post: @post,
          updated: true
        }
      }
    end
  end


  private

  def post_params
    params.require(:data).permit(:caption, :weight, :length, :lure_used, :image)
  end
end
