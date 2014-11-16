class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :category

  validates :title, presence: true, length: { in: 2..50 }
  validates :text, presence: true
  validates :category_id, presence: true, numericality: { only_integer: true }
end
