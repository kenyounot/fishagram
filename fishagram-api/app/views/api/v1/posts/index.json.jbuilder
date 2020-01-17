
json.data @posts do |post|
        json.id post.id
        json.caption post.caption
        json.length post.length
        json.weight post.weight
        json.lure_used post.lure_used
        json.img_url post.image_url if post.image.attached?

        json.comments post.comments, :comment, :id if !post.comments.empty?
end