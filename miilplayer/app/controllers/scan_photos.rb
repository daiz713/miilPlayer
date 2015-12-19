require 'json'

require './app/controllers/save_miil_raw.rb'

def scan_photos (json)
    hash = JSON.parse(json)
    dataset = save_miil_raw(hash)

    puts hash['photos'].size
    return dataset, hash['next_url']
end
