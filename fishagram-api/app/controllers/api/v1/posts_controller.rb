class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render 'show'
    else
      render json: {
        errors: @post.errors.full_messages,
        status: 400
      }
    end
  end

  def update
    if @post = Post.find_by(id: params[:id])
        if @post.update(post_params)

          render json: {
            data: {
              post: @post,
              comments: @post.comments,
              updated: true
            }
          }
        else
          render json: {
              errors: @post.errors.full_messages,
              updated: false
          }
        end  
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])

    if @post.destroy
      render json: {
        deleted: true
      }
      
    else
      render json: {
        deleted: false
      }
    end
  end


  private

  def post_params
    params.permit(:image, :caption, :weight, :length, :lure_used)
  end
end
