describe 'jff'
  
  describe 'manager'
  
    before_each
      doc = elements(fixture('forms'))
    end
    
    it 'should initialize the expando manager'
      form = doc.find('form')
      form.jff()
      form.data('jff.manager').initialized.should.be_true
    end
    
    it 'should start with 0 fields'
      form = doc.find('form')
      jff = form.jff()
      jff.fields().length.should.equal 0
    end
    
  end
  
  describe 'field'
  
    before_each
      doc = elements(fixture('forms'))
      form = doc.find('form')
      jff = form.jff()
    end
    
    it 'should initialize the expando field'
      jff.fields('#text')
      textField = jff.find('#text')
      textField.data('jff.field').initialized.should.be_true
    end
    
    it 'should add the field to the manager'
      jff.fields('#text')
      fields = jff.fields()
      fields.length.should.equal 1
      fields[0]._element.attr('id').should.equal 'text'
    end
    
  end
  
end
