describe 'jff'
  
  describe 'manager'
  
    before_each
      doc = elements(fixture('forms'))
    end
    
    it 'should initialize the expando manager'
      form = doc.find('form')
      form.jff()
      form.data('_jff_manager').initialized.should.be_true
    end
    
    it 'should start with 0 fields'
      form = doc.find('form')
      jff = form.jff()
      jff.field().length.should.equal 0
    end
    
  end
  
end
