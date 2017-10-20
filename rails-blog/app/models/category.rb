class Category < ActiveRecord::Base
  has_many :posts

  validates :title, presence: true, length: { in: 2..50 }
end
