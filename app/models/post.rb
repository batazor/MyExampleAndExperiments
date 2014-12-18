class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  belongs_to :user
  belongs_to :category

  validates :title, presence: true, length: { in: 2..50 }
  validates_format_of :title, :with => /\A[а-яa-z\d]+[а-яa-z][а-яa-z\d]*\z/i, message: "Your title must have at least one letter"
  validates :text, presence: true
  validates :category_id, presence: true, numericality: { only_integer: true }

  # For Tag system
  acts_as_taggable # Alias for acts_as_taggable_on :tags
  acts_as_taggable_on :skills, :interests

  # For find post to link

  # Find to ID or TITLE
  def self.find_id_or_title(id)
    return nil if id.blank?
    if (Integer(id) rescue false)
      find_by(id: id)
    else
      find_by(title: id)
    end
  end

  # Find to date and title
  def self.find_date_ttle(date, title)
    return nil if date.blank? && title.blank?
    selected_date = Date.parse(date)
    find_by(title: title, created_at: selected_date.beginning_of_day..selected_date.end_of_day)
  end
end
