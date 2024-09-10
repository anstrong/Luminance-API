describe('#getUserVocabulary', () => {
    it.todo('should fetch the record for the given user id')

    it.todo('should fetch each word in the user word list')

    it.todo('should set the correct response status and body')

    it.todo('should call next')

    describe('when there is an error', () => {
        it.todo('should call next with the error')
    })
})

describe('#addToVocabulary', () => {
    it.todo('should add the word to the database')

    it.todo('should set the response status and body')

    it.todo('should call next')

    describe('when there is an error', () => {
        it.todo('should call next with the error')
    })
})

describe('#getUserWordAssociations', () => {
    it.todo('should fetch the record for the given user id')

    it.todo('should return the association list for the given word')
})

describe('#addWordToUser', () => {
    it.todo('should add the word to the database')

    it.todo('should set the response status and body')

    it.todo('should call next')

    describe('when the word is not in the request body', () => {
        it.todo('should call next with an error and Bad Request response')
    })

    describe('when there is an error', () => {
        it.todo('should call next with the error')
    })
})

