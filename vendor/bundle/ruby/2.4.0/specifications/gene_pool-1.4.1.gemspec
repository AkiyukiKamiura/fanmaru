# -*- encoding: utf-8 -*-
# stub: gene_pool 1.4.1 ruby lib

Gem::Specification.new do |s|
  s.name = "gene_pool".freeze
  s.version = "1.4.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Brad Pardee".freeze]
  s.date = "2014-04-30"
  s.description = "Generic pooling library for creating a connection pool".freeze
  s.email = ["bradpardee@gmail.com".freeze]
  s.homepage = "http://github.com/bpardee/gene_pool".freeze
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Generic pooling library for creating a connection pool".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<thread_safe>.freeze, [">= 0"])
    else
      s.add_dependency(%q<thread_safe>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<thread_safe>.freeze, [">= 0"])
  end
end
