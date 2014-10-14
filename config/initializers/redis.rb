if ENV["REDISCLOUD_URL"] then
  $redis = Redis.new(:url => ENV["REDISCLOUD_URL"])
elsif
  $redis = Redis.new(:host => 'localhost', :port => 6379)
end
