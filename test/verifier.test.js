require('dotenv').config()
const JWKSTokenVerifier = require('../lib/verifier')

const EXPIRED_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkMjM0OTg4ZTNhYWU2N2FmYmMwMmNiMWM0MTQwYjNjZjk2ODJjYWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzY2ODY1MTQ4MzM3LTBxc3B1NTQ5cWlsanQwZzJvN2ZtZjJtaTVrcXJjb3UwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzY2ODY1MTQ4MzM3LTBxc3B1NTQ5cWlsanQwZzJvN2ZtZjJtaTVrcXJjb3UwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMzUxMzI5NDQxMzI0MzY4MTEyIiwiaGQiOiJmdW5jbWF0aWMuY29tIiwiZW1haWwiOiJkYW5pZWxqeW9vQGZ1bmNtYXRpYy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTc4MjM1Nzc5LCJleHAiOjE1NzgyMzkzNzksImp0aSI6IjI2N2IyZDA2YjdmMjYzNjMzYWI4NzBiYThmMWM2MmYzN2ZkOTk3OTMifQ.ACNLt23UwjJ-jyMbEtr4pmCyFh-_JmojZ_vbTRyoZGBhVKW3PBC55UPT7ziMLNXZuSD3yf49TtsvvICZzI3ZilEPo2HZRbNWhpd88XKkYjNP3-hMXXO48azl4wpTqhUx7MenkrukN2W0vawX0j9XSb-o3NZjaPCQzCJX5AIhRzCPz3TdKs2SMLhfslI7GnzHkuY8STS4iV8H28fDXvw9LdgRmg4afU6Vk12-NIAHy8s_s4jeWyXwNAEGhMmlKkRCkOiwKdV2QDhDRJUjqugJealnWMv3DDmOAm-OAg5u8fcNuLn0-o_O1BZYpulq9uCNWuh4wO8LJ69Du3UiQHB0Sg"
const INVALID_CREDENTIALS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FTXdNakF5TXpnME9EWXhSVEUzTWpOQ05qazNNek13UmpZMU9FUkdSamMyUkVFelFrUkJSUSJ9.eyJnaXZlbl9uYW1lIjoiRGFuaWVsIEpoaW4iLCJmYW1pbHlfbmFtZSI6IllvbyIsIm5pY2tuYW1lIjoiZGFuaWVsanlvbyIsIm5hbWUiOiJEYW5pZWwgSmhpbiBZb28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1MVW0ydnlZY0xUYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFDTS9BZk02ZDVTTkU0US9waG90by5qcGciLCJnZW5kZXIiOiJtYWxlIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xMFQwNDoyODo0NS43MTlaIiwiZW1haWwiOiJkYW5pZWxqeW9vQGdvYWxib29rYXBwLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL3N1cGVyc2hlZXRzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzc2NDEzOTAwNDgyODczNzMyNiIsImF1ZCI6IlJrcFZldDlwem9yMmhaSjAxMkhoMXZwbnJBbFBxWm12IiwiaWF0IjoxNTQ0NDE4MDMxLCJleHAiOjE1NDQ0NTQwMzEsImF0X2hhc2giOiJsMXNFRC1JclBKbFdBNnhWMjNadVpRIiwibm9uY2UiOiJpSjd5UkN2VFZ2YkhLVnh1Wi1IVmUxMk9Kdmd2VjZhUCJ9.zPzNIR0DqvXDpqz7SYq0CwzYN2r6kIyc4J1Fn4DfGbKCluIj2wPuNo_oSDABgii5W7Pw4RI8eYgyq3Yga4urFNPjpS87Z9-4fQ0G00Q-2L4AtHihNqnyb0VjmzWkR1iKao3wYzOLTurrse1uwg4f8KTTDGsL5WRCdfiCd_GgK7kUuKiIRiRn7FfsvcS4eMidMt7wo2rBahBXvRAlwaOxWx6HN7J5TwlcAGkkJW2fc2nd3jXKpRk44l9ZDHQuhR-g63JPdJtSfScVP2JkvALTLW9lV_76lhHLPoR5B5DuVoyFurgePKVZLOropRcuc18BwsA99-gmaWbhfBPYBeO9ww"
const MALFORMED_TOKEN = "BADTOKEN"
const VALID_TOKEN = process.env['TEST_VALID_TOKEN']

describe('Token Verification', () => {
  let verifier = null
  beforeEach(async () => {
    verifier = new JWKSTokenVerifier({ JWKS_URI: process.env.JWKS_URI })
  })  
  it('should verify a valid token', async () => {
    let decoded = await verifier.verify(VALID_TOKEN)
    expect(decoded).toMatchObject({
      header: { alg: 'RS256' },
      payload: { iss: 'accounts.google.com' },
      signature: expect.anything()
    })
  })
  it ('should throw on an expired token', async () => {
    let error = null
    try {
      await verifier.verify(EXPIRED_TOKEN)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual("jwt expired")
  })
  it ('should throw on token from different issuer', async () => {
    let error = null
    try {
      await verifier.verify(INVALID_CREDENTIALS_TOKEN)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual(expect.stringMatching(/^Unable to find a signing key that matches/))
  })
  it ('should throw on a malformed token', async () => {
    let error = null
    try {
      await verifier.verify(MALFORMED_TOKEN)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual(expect.stringMatching(/^Invalid token format/))
  })
  it ('should throw if setup with incorrect JWKS URI', async () => {
    let badverifier = new JWKSTokenVerifier({ JWKS_URI: "https://www.googleapis.com/bad/jwks/uri" })
    let error = null
    try {
      await badverifier.verify(EXPIRED_TOKEN)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual(expect.stringMatching(/^Not Found/))
  })
})

describe('Token Decoding', () => {
  let verifier = null
  beforeEach(async () => {
    verifier = new JWKSTokenVerifier()
  })  
  it ('should decode a token without validation', async () => {
    let decoded = verifier.decode(EXPIRED_TOKEN)
    expect(decoded).toMatchObject({
      header: {
        "typ": "JWT",
        "alg": "RS256",
      },
      payload: {
        "iss": "accounts.google.com",
      }
    })
  })
  it ('should throw if token is malformed', async () => {
    let error = null
    try {
      await verifier.decode(MALFORMED_TOKEN)
    } catch (err) {
      error = err
    }
    expect(error).toBeTruthy()
    expect(error.message).toEqual(expect.stringMatching(/^Invalid token format/))
  })
})