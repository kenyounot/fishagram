
json.array! @posts do |post|
    json.data do
        json.caption post.caption
        json.length post.length
        json.weight post.weight
        json.lure_used post.lure_used
        json.img_url post.image_url if post.image.attached?
    end
end