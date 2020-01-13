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
                    errors: @comment.errors
                }
            }
        end
    end

    def update
    end

    def destroy
    end



    private

    def comment_params
        params.require(:data).permit(:comment, :post_id)
    end
end
