class Post < ApplicationRecord
  include Rails.application.routes.url_helpers


  has_many :comments, dependent: :destroy

  has_one_attached :image

  def image_url
    url_path(self.image)
  end

end
