---
layout: page
permalink: /repositories/
title: projects & code
description: Selected research, course, and personal projects with their GitHub repositories.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

## GitHub activity

{% for user in site.data.repositories.github_users %}

### {{ user }}

<div class="row repositories repositories-activity align-items-stretch">
  <!-- Overall GitHub stats -->
  <div class="col-md-6 mb-3 d-flex justify-content-center">
    {% include repository/repo_user.liquid username=user %}
  </div>

  <!-- Commit streak -->
  <div class="col-md-6 mb-3 d-flex justify-content-center">
    <div class="repo p-2 text-center">
      <img
        class="only-light w-100"
        alt="GitHub streak - {{ user }}"
        src="https://github-readme-streak-stats.herokuapp.com?user={{ user }}&theme={{ site.repo_theme_light }}"
      >
      <img
        class="only-dark w-100"
        alt="GitHub streak - {{ user }}"
        src="https://github-readme-streak-stats.herokuapp.com?user={{ user }}&theme={{ site.repo_theme_dark }}"
      >
    </div>
  </div>
</div>

<!-- Contribution graph (full-width below) -->
<div class="repositories repositories-activity my-3">
  <div class="w-100 text-center">
    <img
      class="w-100"
      alt="GitHub contribution graph - {{ user }}"
      src="https://github-readme-activity-graph.vercel.app/graph?username={{ user }}&theme=github-compact"
    >
  </div>
</div>

---

{% endfor %}
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
