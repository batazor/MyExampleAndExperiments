class Post < ActiveRecord::Base
  belongs_to :user

  validates :content, presence: true,
                      length: { minimum: 6 }
  validates :user_id, presence: true
end
