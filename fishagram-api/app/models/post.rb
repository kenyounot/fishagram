include Rails.application.routes.url_helpers

class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_one_attached :image, dependent: :destroy

  validates :caption, :length, :weight, :lure_used, presence: true
  validates :caption, length: { maximum: 140 }
  validates :length, :weight, numericality: { only_integer: true }
  validates :lure_used, length: { maximum: 20 }


  
  def image_url
    url_for(self.image)
  end

end
