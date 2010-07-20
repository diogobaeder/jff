
describe 'jff'
  describe 'fixture test'
  
    before_each
      doc = elements(fixture('forms'))
    end
    
    it 'there should be only one form'
      doc.find('form').length.should.equal 1
    end
    
  end
end
