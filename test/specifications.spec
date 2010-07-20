describe 'jff'
  
  before_each
    doc = elements(fixture('forms'))
  end

  describe 'fixture'
    
    it 'should be only one form'
      doc.find('form').length.should.equal 1
    end
    
  end
  
  describe 'manager'
    
    it 'should contain only one form'
      form = doc.find('form')
      manager = new jff.Manager(form)
      manager.form.length.should.equal 1
    end
    
  end
  
end
