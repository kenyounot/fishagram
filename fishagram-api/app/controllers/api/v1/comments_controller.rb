class Api::V1::CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: {
                data: {
                    comment: @comment,
                    status: :created,
                }
            }
        else
            render json: {
                data: {
                    created: false,
                    errors: @comment.errors.full_messages
                }
            }
        end
    end

 
    def destroy
        if @comment = Comment.find_by(id: params[:id])
            if @comment.delete
                render json: {
                    deleted: true
                }
            else
                render json: {
                    errors: @comment.errors.full_messages,
                    deleted: false
                }
            end
        else
            render json: {
                deleted: false,
                errors: 'Comment not found'
            }
        end
    end

    private

    def comment_params
        params.permit(:comment, :post_id)
    end
end
