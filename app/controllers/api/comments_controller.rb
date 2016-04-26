class Api::CommentsController < Api::ApplicationController
  load_and_authorize_resource

  def index
    comments = Comment.where({
      ancestry: nil,
      commentable_id: params[:commentable][:id],
      commentable_type: params[:commentable][:type]
    })
    .sort_by_most_voted
    .page(params[:page])
    .per(15)

    child_comments = []
    comments.each do |comment|
      child_comments << Comment.descendants_of(comment)
    end

    comments = (comments + child_comments).flatten

    render json: comments
  end
end
