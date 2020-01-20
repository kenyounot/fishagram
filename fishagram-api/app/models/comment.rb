class Comment < ApplicationRecord
  belongs_to :post

  validates :comment, presence: true
  validates :comment, length: { in: 2..50 };
end
