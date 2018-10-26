# -*- encoding: utf-8 -*-
# stub: oanda_api_v20 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "oanda_api_v20".freeze
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Kobus Joubert".freeze]
  s.date = "2018-04-24"
  s.description = "Ruby client that supports the Oanda REST API V20 methods.".freeze
  s.email = "kobus@translate3d.com".freeze
  s.homepage = "http://rubygems.org/gems/oanda_api_v20".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Ruby Oanda REST API V20".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httparty>.freeze, ["~> 0.13"])
      s.add_runtime_dependency(%q<persistent_httparty>.freeze, ["~> 0.1"])
      s.add_runtime_dependency(%q<http-exceptions>.freeze, ["~> 0.1"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 2.1"])
      s.add_development_dependency(%q<timecop>.freeze, ["~> 0.8"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.5"])
    else
      s.add_dependency(%q<httparty>.freeze, ["~> 0.13"])
      s.add_dependency(%q<persistent_httparty>.freeze, ["~> 0.1"])
      s.add_dependency(%q<http-exceptions>.freeze, ["~> 0.1"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_dependency(%q<webmock>.freeze, ["~> 2.1"])
      s.add_dependency(%q<timecop>.freeze, ["~> 0.8"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.5"])
    end
  else
    s.add_dependency(%q<httparty>.freeze, ["~> 0.13"])
    s.add_dependency(%q<persistent_httparty>.freeze, ["~> 0.1"])
    s.add_dependency(%q<http-exceptions>.freeze, ["~> 0.1"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
    s.add_dependency(%q<webmock>.freeze, ["~> 2.1"])
    s.add_dependency(%q<timecop>.freeze, ["~> 0.8"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.5"])
  end
end
