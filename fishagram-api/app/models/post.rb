include Rails.application.routes.url_helpers

class Post < ApplicationRecord
  


  has_many :comments, dependent: :destroy

  has_one_attached :image, dependent: :destroy

  def say_hello
    "#{self.lure_used} is the best lure out there"
  end

  def image_url
    url_for(self.image)
  end

end
