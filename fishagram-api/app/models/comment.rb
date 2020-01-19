class Comment < ApplicationRecord
  belongs_to :post

  validates :comment, presence: true
  validates :comment, length: { maximum: 50 };
end
