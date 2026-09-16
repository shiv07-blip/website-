import React from 'react';
import { TableOfContentMarkdown } from '~/components/TableOfContentMarkdown';

const markdown = `# Page Title

## First Section

## Second Section
`;

describe('TableOfContentMarkdown scroll spy', () => {
  it('highlights the active section in the TOC while scrolling', () => {
    cy.mount(
      <>
        <h1 id='page-title'>Page Title</h1>
        <TableOfContentMarkdown markdown={markdown} depth={2} />
        <div style={{ height: '1200px' }} />
        <h2 id='first-section'>First Section</h2>
        <div style={{ height: '1200px' }} />
        <h2 id='second-section'>Second Section</h2>
        <div style={{ height: '1200px' }} />
      </>,
    );

    cy.get('[data-toc-link]').should('have.length', 3);
    cy.get('[data-toc-link]')
      .eq(0)
      .should('have.class', 'text-blue-600')
      .should('have.attr', 'aria-current', 'true');

    cy.window().scrollTo(0, 1400);
    cy.get('[data-toc-link]')
      .eq(1)
      .should('have.class', 'text-blue-600')
      .should('have.attr', 'aria-current', 'true');
    cy.get('[data-toc-link]').eq(0).should('not.have.class', 'text-blue-600');

    cy.window().scrollTo('bottom');
    cy.get('[data-toc-link]')
      .eq(2)
      .should('have.class', 'text-blue-600')
      .should('have.attr', 'aria-current', 'true');
  });
});
