"use client"
import React from "react"

interface SearchResultProps {
  searchResults: { id: number, title: string }[];
}

export const SearchResult: React.FC<SearchResultProps> = ({searchResults}) => {
  return (
    <ul>
      {searchResults.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  )
}