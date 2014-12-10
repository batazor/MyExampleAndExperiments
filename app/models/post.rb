class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  belongs_to :user
  belongs_to :category

  validates :title, presence: true, length: { in: 2..50 }
  validates :text, presence: true
  validates :category_id, presence: true, numericality: { only_integer: true }

  # For Tag system
  acts_as_taggable # Alias for acts_as_taggable_on :tags
  acts_as_taggable_on :skills, :interests
end
