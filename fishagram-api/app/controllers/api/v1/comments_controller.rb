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
        if @comment = Comment.find_by(id: params[:id])
            if @comment.update(comment_params)
                render json: {
                    comment: @comment,
                    updated: true
                }

            else
                render json: {
                    comment: @comment,
                    errors: @comment.errors,
                    updated: false
                }
            end

        else
            render json: {
                updated: false,
                errors: @comment.errors
            }
        end
    end

    def destroy
        if @comment = Comment.find_by(id: params[:id])
            @comment.delete

            render json: {
                deleted: true
            }
        else
            render json: {
                comment: @comment,
                deleted: false,
                errors: @comment.errors
            }
        end
    end

    private

    def comment_params
        params.permit(:comment, :post_id)
    end
end
