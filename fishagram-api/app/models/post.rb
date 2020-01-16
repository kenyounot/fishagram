include Rails.application.routes.url_helpers

class Post < ApplicationRecord
  has_many :comments, dependent: :destroy

  has_one_attached :image, dependent: :destroy

  def image_url
    url_for(self.image)
  end

end
