
describe 'jff'
  describe '.fakeTest()'
  
    before_each
      doc = jQuery(fixture('forms'))
    end
    
    it 'should throw an error'
      true.should.be false
    end
    
  end
end
