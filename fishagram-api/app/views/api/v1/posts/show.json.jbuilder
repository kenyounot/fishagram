json.data do
    json.id @post.id
    json.caption @post.caption
    json.weight @post.weight
    json.length @post.length
    json.lure_used @post.lure_used
    json.img_url @post.image_url if @post.image.attached?

    json.comments @post.comments, :comment if !@post.comments.empty?
end